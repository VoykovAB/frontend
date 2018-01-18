import {Component, OnInit} from '@angular/core';
import {IUser} from '../../models/user.model';
import {ApiService} from '../../services/api.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
@Component({
    selector: 'users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
    public users: Array<IUser> = [];
    public colors: string[] = [
        'table-active',
        'table-primary',
        'table-secondary',
        'table-success',
        'table-danger',
        'table-warning',
        'table-info',
        'table-light',
        'table-dark',
    ];
    public formGroup: FormGroup;
    public current_id = 'new';

    constructor(
        private _api: ApiService,
        private formBuilder: FormBuilder,
    ) {

    }

    ngOnInit() {
        this.formGroup = this.formBuilder.group({
            first_name: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(255)])],
            last_name: ['', Validators.compose([Validators.required, Validators.maxLength(255)])],
            email: ['', Validators.compose([Validators.required, Validators.maxLength(255)])],
            _id: ['', ],
        });
        this.checkUsers();
    }

    public checkUsers() {
        const subscription = this._api.get('users').subscribe((resp) => {
                this.users = resp;
                // this.rrr = resp.message;
                console.log(this.users);
                subscription.unsubscribe();
            }
        );
    }

    public deleteUser(user: IUser) {
        const subscription = this._api.delete('user', user).subscribe((resp) => {
                console.log(resp);
                if (resp['ok']) {
                    this.users.forEach((user_i: IUser, i: number) => {
                        if ( user_i._id === user._id) {
                            this.users.splice(i, 1);
                            return;
                        }
                    });
                }
                subscription.unsubscribe();
            }
        );
    }
    public createUser() {
        console.log(this.formGroup.controls);
        const subscription = this._api.post('user', {
            first_name: this.formGroup.controls['first_name'].value,
            last_name: this.formGroup.controls['last_name'].value,
            email: this.formGroup.controls['email'].value,
        }).subscribe((resp) => {
                console.log(resp);
                this.users.push(resp);
                subscription.unsubscribe();
            }
        );
    }
    public updateUser() {
        console.log(this.formGroup.controls);
        const subscription = this._api.put('user', {
            first_name: this.formGroup.controls['first_name'].value,
            last_name: this.formGroup.controls['last_name'].value,
            email: this.formGroup.controls['email'].value,
            _id: this.formGroup.controls['_id'].value
        }).subscribe((resp) => {
                if (resp['ok']) {
                    this.users[this.current_id].first_name = this.formGroup.controls['first_name'].value;
                    this.users[this.current_id].last_name = this.formGroup.controls['last_name'].value;
                    this.users[this.current_id].email = this.formGroup.controls['email'].value;

                    this.formGroup.controls['first_name'].setValue('');
                    this.formGroup.controls['last_name'].setValue('');
                    this.formGroup.controls['email'].setValue('');
                    this.formGroup.controls['_id'].setValue('');
                    this.current_id = 'new';
                }
                subscription.unsubscribe();
            }
        );
    }
    public userToUpdate(user: IUser, id: number) {
        this.formGroup.controls['first_name'].setValue(user.first_name);
        this.formGroup.controls['last_name'].setValue(user.last_name);
        this.formGroup.controls['email'].setValue( user.email);
        this.formGroup.controls['_id'].setValue(user._id);

        this.current_id = String(id);
    }
}
