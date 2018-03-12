import { Component, OnInit, Input } from '@angular/core';
import { Gemstone } from '../gemstone';

@Component({
  selector: 'app-gemstone-glance',
  templateUrl: './gemstone-glance.component.html',
  styleUrls: ['./gemstone-glance.component.css']
})
export class GemstoneGlanceComponent implements OnInit {
  @Input() gemstone: Gemstone;
  constructor() { }

  ngOnInit() {
  }

}
