import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ContactService } from '../../../core/infrastructure/services/contact.service';
import { ContactUs } from '../../../core/domain/entities/contact-us.entity';
import { CopyrightComponent } from '../auth/components/copyright/copyright.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-us',
  imports: [MatIconModule, CopyrightComponent, CommonModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent implements OnInit{
  contact!: ContactUs;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.loadContact();
  }

  loadContact() {
    this.contactService.getContact().subscribe((res) => {
      this.contact = res;
    });
  }
}
