import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  tickets: any[] = [];
  currentUser: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.fetchTickets();
  }

  fetchTickets() {
    this.http.get<any[]>('http://localhost:3000/tasks').subscribe(tickets => {
      this.tickets = tickets;
    });
  }

  assignTicket(ticketId: number, user: string) {
    this.http.put(`http://localhost:3000/tasks/${ticketId}`, { assignedTo: user }).subscribe(() => {
      this.fetchTickets(); // Refresh tickets list
    });
  }
}
