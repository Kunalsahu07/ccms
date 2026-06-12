import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export interface CaseCategory {
  label: string;
  bold?: string;
  value: number;
  color: string;
  topic: string;
  badgeBg: string;
  badgeText: string;
  icon: string;
  percent?: number;
  cardBg: string;
}

@Component({
  selector: 'app-outerdashboard',
  standalone: false,
  templateUrl: './outerdashboard.html',
  styleUrl: './outerdashboard.scss',
})
export class Outerdashboard implements AfterViewInit {

  @ViewChild('donutCanvas') donutCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('barCanvas') barCanvas!: ElementRef<HTMLCanvasElement>;

  total = 126998;

  categories: CaseCategory[] = [
    { label: 'Civil Cases', bold: 'Bolder', value: 80698, color: '#534AB7', topic: '#3e31cd', badgeBg: '#EEEDFE', badgeText: '#000000', icon: 'gavel', cardBg: '#9089da' },
    { label: 'Criminal Cases', bold: 'Bolder', value: 24521, color: '#C0392B', topic: '#921515', badgeBg: '#FDECEC', badgeText: '#000000', icon: 'security', cardBg: '#e87e7e' },
    { label: 'Contempt Cases', bold: 'Bolder', value: 1677, color: '#E67E22', topic: '#854f15', badgeBg: '#f3eee8', badgeText: '#000000', icon: 'report', cardBg: '#f5b97a' },
    { label: 'Pending', bold: 'Bolder', value: 31932, color: '#BA7517', topic: '#926911', badgeBg: '#FAEEDA', badgeText: '#000000', icon: 'hourglass_empty', cardBg: '#f5ce7a' },
    { label: 'Disposed', bold: 'Bolder', value: 95066, color: '#27AE60', topic: '#23914d', badgeBg: '#E9F7EF', badgeText: '#000000', icon: 'task_alt', cardBg: '#7ed6a0' },
  ];

  ngAfterViewInit(): void {
    this.buildDonut();
    this.buildBar();
  }

  private buildDonut(): void {
    new Chart(this.donutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: this.categories.map(c => c.label),
        datasets: [{
          data: this.categories.map(c => c.value),
          backgroundColor: this.categories.map(c => c.color),
          borderColor: '#ffffff',
          borderWidth: 3,
          hoverOffset: 10,
        }]
      },
      options: {
        cutout: '68%',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 16,
              font: { size: 12, family: 'Georgia' },
              usePointStyle: true,
              pointStyleWidth: 10,
            }
          },
          tooltip: {
            callbacks: {
              label: ctx => ` ${ctx.label}: ${ctx.parsed.toLocaleString('en-IN')} (${this.getPercent(ctx.parsed)}%)`
            }
          }
        }
      }
    });
  }

  private buildBar(): void {
    new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: this.categories.map(c => c.label),
        datasets: [{
          label: 'Number of Cases',
          data: this.categories.map(c => c.value),
          backgroundColor: this.categories.map(c => c.cardBg),
          borderColor: this.categories.map(c => c.color),
          borderWidth: 2,
          borderRadius: 8,
          borderSkipped: false,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: ctx => ` ${(ctx.raw as number).toLocaleString('en-IN')} cases`
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { font: { size: 11, family: 'Georgia' } }
          },
          y: {
            beginAtZero: true,
            grid: { color: '#f0f0f0' },
            ticks: {
              font: { size: 11 },
              callback: (val) => Number(val).toLocaleString('en-IN')
            }
          }
        }
      }   // ← closes options: {
    });   // ← closes new Chart(
  }




  getPercent(value: number): number {
    return Math.round((value / this.total) * 100);
  }

  formatNumber(value: number): string {
    return value.toLocaleString('en-IN');
  }
}