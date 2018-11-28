import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";
import {
  Stitch,
  RemoteMongoClient,
  UserApiKeyCredential,
  UserPasswordCredential,
  UserPasswordAuthProvider,
  UserPasswordAuthProviderClient,
  GoogleRedirectCredential
} from "mongodb-stitch-browser-sdk";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  email: String;
  password: String;

  constructor(
    private flashmessage: FlashMessagesService,
    private router: Router
  ) {}

  ngOnInit() {}

  onLoginSubmit() {
    const user = {
      email: this.email,
      password: this.password
    };

    Stitch.initializeDefaultAppClient("<your app id>");
    // Parse the URL query parameters
    const url = window.location.search;
    const params = new URLSearchParams(url);
    const token = params.get("token");
    const tokenId = params.get("tokenId");

    // Confirm the user's email/password account
    const emailPassClient = Stitch.defaultAppClient.auth.getProviderClient(
      UserPasswordAuthProviderClient.factory
    );

    return emailPassClient.confirmUser(token, tokenId);
  }
}
