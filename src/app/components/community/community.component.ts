import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { ICommunity } from 'src/app/interfaces/i-community';
import { IPost } from 'src/app/interfaces/i-post';
import { IUserBD } from 'src/app/interfaces/i-user';
import { CommunitiesService } from 'src/app/services/communities/communities.service';
import { LoginService } from 'src/app/services/login/login.service';
import { PostsService } from 'src/app/services/posts/posts.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css'],
})
export class CommunityComponent implements OnInit {
  posts_aux: IPost[][] = [];
  posts?: IPost[] | undefined;
  commName?: string | undefined;
  hasError: boolean = false;
  errorMsg: string = '';
  user?: IUserBD;
  followsComm: boolean | undefined;
  filterText: string = '';
  isAuthor: boolean = false;
  isLogged: boolean = false;
  constructor(
    private router: ActivatedRoute,
    private communityService: CommunitiesService,
    private postsService: PostsService,
    private userService: UsersService,
    private navigateRouter: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.postsService.searchEvent.subscribe((data) => (this.filterText = data));

    this.isLogged = this.loginService.isLogged();

    this.loginService.logged.subscribe((log) => (this.isLogged = log));

    this.router.params.subscribe((param) => {
      this.commName = param['idCom'];
      this.communityService
        .getCommunityByName(this.commName!)
        .subscribe((comm) => {
          if (comm.posts)
            this.posts = this.postsService.getTransformedPosts(comm.posts!);
          this.userService
            .getUser(localStorage.getItem('localId')!)
            .subscribe((user) => {
              this.user = user;
              if (user)
                if (user.nickname == comm.author) this.isAuthor = true;
                else {
                  this.followsComm = this.checkIfUserFollowsCommunity(
                    user,
                    param['idCom']
                  );
                }
              return user;
            });
        });
    });
  }

  getError(error: any) {
    this.hasError = error.value;
    this.errorMsg = error.error;

    setTimeout(() => {
      this.hasError = false;
    }, 5000);
  }

  checkIfUserFollowsCommunity(user: IUserBD, community: string): boolean {
    if (user.communities) {
      return Object.values(user.communities).includes(community);
    }
    return false;
  }
  followOrUnfollow() {
    if (this.followsComm) {
      this.userService
        .deleteUserCommunity(localStorage.getItem('localId')!, this.commName!)
        .subscribe((resp) => {
          this.followsComm = !this.followsComm;
          return resp;
        });
    } else {
      this.userService
        .createUserCommunity(localStorage.getItem('localId')!, this.commName!)
        .subscribe((resp) => {
          this.followsComm = !this.followsComm;
          return resp;
        });
    }
  }

  deleteCommunity() {
    if (confirm('Are you sure do u want to delete this community?')) {
      this.communityService.deleteCommunity(this.commName!).subscribe((d) => {
        this.userService.getUsers().subscribe((users) => {
          users.map((user) => {
            if (user.communities) {
              Object.values(user.communities).map((community) => {
                if (this.commName == community) {
                  this.userService
                    .deleteUserCommunity(user.id!, community)
                    .subscribe((deleted) =>
                      this.navigateRouter.navigate(['/home'])
                    );
                }
              });
            }
          });
        });
      });
    }
  }
}
