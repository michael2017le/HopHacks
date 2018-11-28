import { Component, OnInit } from "@angular/core";
import { FlashMessagesService } from "angular2-flash-messages";
import {
  Stitch,
  RemoteMongoClient,
  UserApiKeyCredential,
  AnonymousCredential,
  UserPasswordCredential,
  UserPasswordAuthProvider,
  UserPasswordAuthProviderClient,
  GoogleRedirectCredential
} from "mongodb-stitch-browser-sdk";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  name: string;
  username: string;
  email: string;
  password: string;

  appId = "saveTheWorld-htvgh";

  constructor(private flashMessages: FlashMessagesService) {}

  ngOnInit() {}

  onRegisterSubmit() {
    const user = {
      email: this.email,
      password: this.password
    };

    const client = Stitch.initializeDefaultAppClient(this.appId);

    // client.auth.user;

    const mongoClient = client.getServiceClient(
      RemoteMongoClient.factory,
      "mongodb-atlas"
    );

    const coll = mongoClient.db("accounts").collection("users");

    const emailPassClient = Stitch.defaultAppClient.auth.getProviderClient(
      UserPasswordAuthProviderClient.factory
    );

    const credential = new GoogleRedirectCredential("/register");
    Stitch.defaultAppClient.auth.loginWithRedirect(credential);
    emailPassClient
      .registerWithEmail(this.email, this.password)
      .then(() => {
        console.log("Successfully Sent account information email");
      })
      .catch(err => {
        console.log("Error registering new user: ", err);
      });

    // coll
    //   .insertOne({
    //     user: user
    //   })
    //   .then(() => {});
  }
}
