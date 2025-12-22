import { Component, computed, DestroyRef, inject, input, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, RouterOutlet, RouterLink, ResolveFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Component({
    selector: 'app-user-tasks',
    templateUrl: './user-tasks.component.html',
    styleUrl: './user-tasks.component.css',
    imports: [RouterOutlet, RouterLink]
})
export class UserTasksComponent {
  private usersService = inject(UsersService)
  private activatedRoute = inject(ActivatedRoute)
  private destryoRef = inject(DestroyRef)
  
  //NOTE: There are threed different way of fetching input param in routing. 
  // input, activatedRoute(observable), route resolver 
  // NOTE: input like followings: Only two lines of code
  // userId = input.required<string>()
  // userName = computed(() => this.usersService.users.find(u => u.id === this.userId())?.name)
  message = input.required<string>()
  //NOTE: activatedRoute: You need to subscribe to the activatedRoute obj and listen paramMap to get all input values by route
  // userName = ''
  userName = input.required<string>()

  // ngOnInit(): void {
  //   const paramSubs = this.activatedRoute.paramMap.subscribe({
  //     next: param => this.userName = this.usersService.users.find(u => u.id === param.get('userId'))?.name ?? ''
  //   })
  //   //NOTE: data has both static and dynamic data(resolve)
  //   const dataSubs = this.activatedRoute.data.subscribe({
  //     next: data => console.log(data['message'])
  //   })
  //   this.destryoRef.onDestroy(() => paramSubs.unsubscribe())
  //   this.destryoRef.onDestroy(() => dataSubs.unsubscribe())
  // }

}

//NOTE: This is another way of passing param value to the component. Here we can directly pass only userName,
// instead of doing more steps to get userName in other options. Also we can move this block into another file!
// So we can remove almost everything from the component and just leave userName input.required()
export const resolveUserName: ResolveFn<string> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const usersService = inject(UsersService)
  return usersService.users.find(u => u.id === route.paramMap.get('userId'))?.name ?? ''
}

export const resolveTitle: ResolveFn<string> = (route, state) => {
  return resolveUserName(route, state) + 's Tasks'
}