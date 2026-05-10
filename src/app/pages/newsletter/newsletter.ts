import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsletterService, Subscriber } from '../../services/newsletter.service';
import { Sidebar } from '../../components/sidebar/sidebar';
import { Navbar } from '../../components/navbar/navbar';

@Component({
  selector: 'app-newsletter',
  standalone: true,
  imports: [CommonModule, Sidebar, Navbar],
  templateUrl: './newsletter.html'
})
export class Newsletter implements OnInit {
  subscribers: Subscriber[] = [];
  sidebarCollapsed = false;

  constructor(private newsletterService: NewsletterService) {}

  ngOnInit() {
    this.loadSubscribers();
  }

  loadSubscribers() {
    this.newsletterService.getSubscribers().subscribe(data => {
      this.subscribers = data;
    });
  }

  onSidebarToggle(collapsed: boolean) {
    this.sidebarCollapsed = collapsed;
  }

  deleteSubscriber(id: string) {
    if (confirm('Supprimer cet abonné ?')) {
      this.newsletterService.deleteSubscriber(id).subscribe(() => {
        this.loadSubscribers();
      });
    }
  }

  exportToCSV() {
    const csvData = this.subscribers.map(s => `${s.email},${s.createdAt}`).join('\n');
    const blob = new Blob([`Email,Date d'inscription\n${csvData}`], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `newsletter_subscribers_${new Date().toLocaleDateString()}.csv`;
    a.click();
  }
}
