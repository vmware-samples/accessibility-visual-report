import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-contrast-checker',
  templateUrl: './contrast-checker.component.html',
  styleUrls: ['./contrast-checker.component.css']
})
export class ContrastCheckerComponent implements OnInit {
  f: string;
  b: string;
  @Input() isContrastCheck: boolean;
  @Input() activeContrastEleStyle: any;
  @Output() public updateColor: EventEmitter<any> = new EventEmitter();
  @Output() public closeContrastModal: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void { 
    setTimeout(() => {
      this.f = this.rgbToHex(this.activeContrastEleStyle.c);
      this.b = this.rgbToHex(this.activeContrastEleStyle.b);
      this.update();
    }, 100);
  }

  rgbToHex(color) {
    var values = color
    .replace(/rgba?\(/, '')
    .replace(/\)/, '')
    .replace(/[\s+]/g, '')
    .split(',');
    var a = parseFloat(values[3] || 1),
    r = Math.floor(a * parseInt(values[0]) + (1 - a) * 255),
    g = Math.floor(a * parseInt(values[1]) + (1 - a) * 255),
    b = Math.floor(a * parseInt(values[2]) + (1 - a) * 255);
    return "#" +
    ("0" + r.toString(16)).slice(-2) +
    ("0" + g.toString(16)).slice(-2) +
    ("0" + b.toString(16)).slice(-2);
  }

  ligntnessMove(Lightness) {
    let $this = this;
    $('#' + Lightness).mousemove(function() {
			$this.changeHue($(this).attr('id').substr(0, 1));
    });
  }

  colorChange(Pick) {
    var $this = $("#" + Pick),
          color = $this.val(),
          context = $this.attr('id').substr(0, 1);
          
      $('#' + context + 'Error').slideUp();
      if (color.substr(0, 1) !== '#') color = '#' + color;
      if (color.length == 4) color = '#' + color.substr(1, 1).repeat(2) + color.substr(2, 1).repeat(2) + color.substr(-1).repeat(2);
      $this.val(color);
      // Validation
      if (color.length !== 7 || isNaN(this.getRGB(color.substr(1)))) {
        $this.attr({'aria-invalid': true, 'aria-describedby': context + 'Error'});
        $('#' + context + 'Error').slideDown('fast', function() {
          $this.focus();
        });
      } else {
        $this.removeAttr('aria-invalid aria-describedby');
        $('#' + context + 'Error').slideUp('fast');
        this[context] = eval('color.toUpperCase()');
        
        this.update();
      }
  }

  contrastSubmit(e) {
    e.preventDefault();
  }

  // Update all when one is changed
  update() {
    if(this.isContrastCheck) {
      $('#fHex, #fPick').val(this.f);
      $('#bHex, #bPick').val(this.b);
      this.updateColor.emit({f: this.f, b: this.b});
      // Update lightness sliders
      var fHSL = this.RGBtoHSL(this.getRGB(this.f.substr(1, 2)), this.getRGB(this.f.substr(3, 2)), this.getRGB(this.f.substr(-2)));
      var bHSL = this.RGBtoHSL(this.getRGB(this.b.substr(1, 2)), this.getRGB(this.b.substr(3, 2)), this.getRGB(this.b.substr(-2)));
      $('#fLightness').val(Math.round(fHSL[2]))
        .next('div.gradient').css('background', 'linear-gradient(to right,hsl(' + fHSL[0] + ',' + fHSL[1] + '%,0%), hsl(' + fHSL[0] + ',' + fHSL[1] + '%,50%), hsl(' + fHSL[0] + ',' + fHSL[1] + '%,100%))');
      $('#bLightness').val(Math.round(bHSL[2]))
        .next('div.gradient').css('background', 'linear-gradient(to right,hsl(' + bHSL[0] + ',' + bHSL[1] + '%,0%), hsl(' + bHSL[0] + ',' + bHSL[1] + '%,50%), hsl(' + bHSL[0] + ',' + bHSL[1] + '%,100%))');

      // Update contrast ratio
      this.checkContrast();
    } 
  }

  // Calculation Functions

  changeHue(context) {
    let HSL = this.RGBtoHSL(this.getRGB(this[context].substr(1, 2)), this.getRGB(this[context].substr(3, 2)), this.getRGB(this[context].substr(-2)));
    let RGB = this.HSLtoRGB(HSL[0], HSL[1], $('#' + context + 'Lightness').val());
    let RGBS: string[] = [];
    for (var i = 0; i < 3; i++) {
      RGBS.push((RGB[i] >= 16) ? RGB[i].toString(16) : '0' + RGB[i].toString(16));
    }
    
    this[context] = eval('"#" + (RGBS[0] + RGBS[1] + RGBS[2]).toUpperCase()');
    this.update();
  }

  checkContrast() {
    var L1 = this.getL(this.f), L2 = this.getL(this.b), ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
    // Dec2() truncates the number to 2 decimal places without rounding.
    $('#ratio').html('<b>' + this.Dec2((ratio * 100) / 100) + '</b>:1');
    //$('#ratio').html('<b>' + (Math.round(ratio * 100) / 100).toFixed(2) + '</b>:1');
    if (ratio >= 4.5) {
      $('#normalAA, #bigAAA').attr('class', 'pass').text('Pass');
      $('#ratioContainer').attr('class', 'pass');
    } else {
      $('#normalAA, #bigAAA').attr('class', 'fail').text('Fail');
      $('#ratioContainer').removeClass('pass');
    }
    if (ratio >= 3) {
      $('#bigAA').attr('class', 'pass').text('Pass');
      $('#uiAA').attr('class', 'pass').text('Pass');
    } else {
      $('#bigAA').attr('class', 'fail').text('Fail');
      $('#uiAA').attr('class', 'fail').text('Fail');
    }
    if (ratio >= 7) {
      $('#normalAAA').attr('class', 'pass').text('Pass');
    } else {
      $('#normalAAA').attr('class', 'fail').text('Fail');
    }
  }

  getRGB(c) {
    try {
      c = parseInt(c, 16);
    } catch (err) {
      c = false;
    }
    return c;
  }

  HSLtoRGB(H, S, L) {
    let p1, p2, R, G, B;
    L /= 100;
    S /= 100;
    if (L <= 0.5) p2 = L * (1 + S);
    else p2 = L + S - (L * S);
    p1 = 2 * L - p2;
    if (S == 0) {
      R = G = B = L;
    } else {
      R = this.findRGB(p1, p2, H + 120);
      G = this.findRGB(p1, p2, H);
      B = this.findRGB(p1, p2, H - 120);
    }
    return [Math.round(R *= 255), Math.round(G *= 255), Math.round(B *= 255)];
  };

  RGBtoHSL(r, g, b) {
    let Min, Max, S, H, L;
    r = (r / 51) * 0.2;
    g = (g / 51) * 0.2;
    b = (b / 51) * 0.2;
    if (r >= g) {
      Max = r;
    } else {
      Max = g;
    }
    if (b > Max) {
      Max = b;
    }
    if (r <= g) {
      Min = r;
    } else {
      Min = g;
    }
    if (b < Min) {
      Min = b;
    }
    L = (Max + Min) / 2;
    if (Max == Min) {
      S = H = 0;
    } else {
      if (L < 0.5) {
        S = (Max - Min) / (Max + Min);
      } else {
        S = (Max - Min) / (2 - Max - Min);
      }
      if (r == Max) {
        H = (g - b) / (Max - Min);
      }
      if (g == Max) {
        H = 2 + ((b - r) / (Max - Min));
      }
      if (b == Max) {
        H = 4 + ((r - g) / (Max - Min));
      }
    }
    H = Math.round(H * 60);
    if (H < 0) {
      H += 360;
    }
    if (H >= 360) {
      H -= 360;
    }
    return [H, Math.round(S * 100), Math.round(L * 100)];
  }

  findRGB(q1, q2, hue) {
    if (hue > 360) hue -= 360;
    if (hue < 0) hue += 360;
    if (hue < 60) return (q1 + (q2 - q1) * hue / 60);
    else if (hue < 180) return(q2);
    else if (hue < 240) return(q1 + (q2 - q1) * (240 - hue) / 60);
    else return(q1);
  }

  getsRGB(c) {
    c = this.getRGB(c) / 255;
    c = (c <= 0.03928) ? c / 12.92 : Math.pow(((c + 0.055) / 1.055), 2.4);
    return c;
  }

  getL(c) {
    return (0.2126 * this.getsRGB(c.substr(1, 2)) + 0.7152 * this.getsRGB(c.substr(3, 2)) + 0.0722 * this.getsRGB(c.substr(-2)));
  }

  Dec2(num) {
    num = String(num);
    if(num.indexOf('.') !== -1) {
      var numarr = num.split(".");
      if (numarr.length == 1) {
        return Number(num);
      }
      else {
        return Number(numarr[0]+"."+numarr[1].charAt(0)+numarr[1].charAt(1));
      }
    }
    else {
      return Number(num);
    }
  }

  closeModal() {
    this.isContrastCheck = false;
    this.closeContrastModal.emit();
  }

  isDown = false;

  diffX: number; // The location of the click event X
  diffY: number; // The location of the click event Y

  moveX: number;
  moveY: number;

  startTime = 0;
  @HostListener('document:mousedown', ['$event']) onMousedown(event) {
    this.isDown = true;
    var event = event || window.event;

    this.startTime = event.timeStamp;
    const dragRef = document.getElementById('contrast-check-dialog');
    this.diffX = event.clientX - dragRef.offsetLeft;
    this.diffY = event.clientY - dragRef.offsetTop;

    event.stopPropagation();
    // 获取需要排除的元素
    const solidBorderSign = event.toElement || event.srcElement;
    var elemCancel = solidBorderSign.id == 'pop-out-in' || solidBorderSign.id == 'pop-outIn-img' || 
      solidBorderSign.id == 'menu-content-fixed' || solidBorderSign.id == 'fLightness' || solidBorderSign.id == 'bLightness';
    // 如果拖拽的是排除元素，函数返回
    if (elemCancel) {
      return true;
    }
  }

  @HostListener('document:mousemove', ['$event']) onMousemove(event) {
    if (this.isDown) {
      var event = event || window.event;
      this.moveX = event.clientX - this.diffX;
      this.moveY = event.clientY - this.diffY;
      const dragRef = document.getElementById('contrast-check-dialog');
      // 获取需要排除的元素
      const solidBorderSign = event.toElement || event.srcElement;
      var elemCancel = solidBorderSign.id == 'pop-out-in' || solidBorderSign.id == 'pop-outIn-img' ||
        solidBorderSign.id == 'menu-content-fixed' || solidBorderSign.id == 'fLightness' || solidBorderSign.id == 'bLightness';
      if (elemCancel) {
        return true;
      }

      if(this.moveX < 0){
        this.moveX = 0
      }else if(this.moveX > window.innerWidth - dragRef.offsetWidth){
        this.moveX = window.innerWidth - dragRef.offsetWidth
      }
      if(this.moveY < 0){
        this.moveY = 0
      }else if(this.moveY > window.innerHeight - dragRef.offsetHeight){
        this.moveY =  window.innerHeight - dragRef.offsetHeight
      }

      dragRef.style.left = this.moveX + 'px';
      dragRef.style.top = this.moveY + 'px';
      console.log(dragRef.style.left, dragRef.style.top)
    }
  }

  @HostListener('document:mouseup', ['$event']) onMouseup(event) {
    if (this.isDown) {
      this.isDown = false;
    }
    this.startTime = 0;
  }
}
