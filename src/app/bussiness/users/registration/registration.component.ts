import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor(public service: UsersService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.service.register().subscribe(
      (res: any) => {
        if (res.isSuccessed) {
          this.service.formModel.reset();
          this.toastr.success('New user created!', 'Registration successful.');
        }
        else {
          this.toastr.error(res.message, 'Registration failed.');
        }

      },
      err => {
        console.log(err);
      }
    );
  }

}
