import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CouponService, Coupon } from '../../services/coupon.service';
import { Sidebar } from '../../components/sidebar/sidebar';
import { Navbar } from '../../components/navbar/navbar';

@Component({
  selector: 'app-coupons',
  standalone: true,
  imports: [CommonModule, FormsModule, Sidebar, Navbar],
  templateUrl: './coupons.html'
})
export class Coupons implements OnInit {
  coupons: Coupon[] = [];
  sidebarCollapsed = false;
  
  newCoupon = {
    code: '',
    pourcentage: 10,
    expiration: ''
  };

  constructor(private couponService: CouponService) {}

  ngOnInit() {
    this.loadCoupons();
    // Default expiration: 30 days from now
    const date = new Date();
    date.setDate(date.getDate() + 30);
    this.newCoupon.expiration = date.toISOString().split('T')[0];
  }

  loadCoupons() {
    this.couponService.getCoupons().subscribe(data => {
      this.coupons = data;
    });
  }

  onSidebarToggle(collapsed: boolean) {
    this.sidebarCollapsed = collapsed;
  }

  createCoupon() {
    if (!this.newCoupon.code) return;
    this.couponService.createCoupon(this.newCoupon).subscribe(() => {
      this.loadCoupons();
      this.newCoupon.code = '';
    });
  }

  toggleCoupon(id: string) {
    this.couponService.toggleCoupon(id).subscribe(() => {
      this.loadCoupons();
    });
  }

  deleteCoupon(id: string) {
    if (confirm('Supprimer ce coupon ?')) {
      this.couponService.deleteCoupon(id).subscribe(() => {
        this.loadCoupons();
      });
    }
  }
}
