import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Order} from '../../classes/Order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  @Input() order: Order;
}
