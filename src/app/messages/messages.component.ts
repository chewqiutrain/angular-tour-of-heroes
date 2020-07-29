import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  //messageService needs to be public because we are binding it to the template
  //angular only binds to public component properties
  constructor(public messageService: MessageService) { }

  ngOnInit(): void {
  }

}
