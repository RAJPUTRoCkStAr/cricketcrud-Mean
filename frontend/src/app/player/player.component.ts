import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'player-student',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent {
  PlayerArray: any[] = [];
  currentPlayerID = "";
  name: string = "";
  country: string = "";
  price: string = "";
  jerseynumber: string = "";

  constructor(private http: HttpClient) {
    this.getAllPlayer();
  }

  getAllPlayer() {
    this.http.get("http://localhost:5000/players")
      .subscribe((resultData: any) => {
        console.log(resultData);
        this.PlayerArray = resultData;
      });
  }

  setUpdate(data: any) {
    this.name = data.name;
    this.country = data.country;
    this.price = data.price;
    this.jerseynumber = data.jerseynumber;
    this.currentPlayerID = data._id;
  }

  UpdateRecords() {
    let bodyData = {
      "name": this.name,
      "country": this.country,
      "price": this.price,
      "jerseynumber": this.jerseynumber,
    };
    this.http.patch("http://localhost:5000/players" + "/" + this.currentPlayerID, bodyData).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Student Updated")
      this.getAllPlayer();
    });

  }

  setDelete(data: any) {
    this.http.delete("http://localhost:5000/players" + "/" + data._id).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Student Deleted")
      this.getAllPlayer();
    });
  }

  save() {
    if (this.currentPlayerID == '') {
      this.register();
    } else {
      this.UpdateRecords();
    }
  }

  register() {
    let bodyData = {
      "name": this.name,
      "country": this.country,
      "price": this.price,
      "jerseynumber": this.jerseynumber,
    };
    this.http.post("http://localhost:5000/player/create", bodyData).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Student Registered Successfully")
      this.name = '';
      this.country = '';
      this.price = '';
      this.jerseynumber = '';
      this.getAllPlayer();
    });
  }
}
