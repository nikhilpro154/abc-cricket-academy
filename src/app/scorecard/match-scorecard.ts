import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CricbuzzService } from '../services/cricbuzz.service';
import { finalize } from 'rxjs';

interface TeamInfo {
  teamId: number;
  teamName: string;
  teamSName: string;
}

interface VenueInfo {
  ground: string;
  city: string;
}

interface FlatMatch {
  matchId: number;
  seriesName: string;
  matchDesc: string;
  matchFormat: string;
  status: string;
  team1: TeamInfo;
  team2: TeamInfo;
  team1Score?: string;
  team2Score?: string;
  venueInfo: VenueInfo;
}

@Component({
  selector: 'app-match-scorecard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './match-scorecard.html',
  styleUrls: ['./match-scorecard.css']
})
export class MatchScorecard implements OnInit {
  loading = true;
  error = '';
  matches: FlatMatch[] = [];

  constructor(private api: CricbuzzService, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.api
      .getRecentMatches()
      .pipe(finalize(() => { this.loading = false; this.cdr.detectChanges(); }))
      .subscribe({
        next: (res: any) => {
          try {
            this.matches = this.flatten(res);
            this.cdr.detectChanges();
          } catch (e) {
            console.error('Parse error', e);
            this.error = 'Failed to parse matches.';
            this.cdr.detectChanges();
          }
        },
        error: (err) => {
          this.error = 'Failed to load matches. Please try again later.';
          console.error(err);
          this.cdr.detectChanges();
        }
      });
  }

  openDetails(matchId: number) {
    // Placeholder for future detailed page
    this.router.navigate(['/scorecard', matchId]);
  }

  private flatten(res: any): FlatMatch[] {
    if (!res || !Array.isArray(res.typeMatches)) return [];

    const out: FlatMatch[] = [];
    for (const type of res.typeMatches) {
      const seriesMatches = Array.isArray(type?.seriesMatches) ? type.seriesMatches : [];
      for (const s of seriesMatches) {
        const wrapper = s?.seriesAdWrapper;
        const seriesName = wrapper?.seriesName || '';
        const matchesArr = Array.isArray(wrapper?.matches) ? wrapper.matches : [];
        for (const m of matchesArr) {
          const info = m?.matchInfo;
          if (!info || !info.matchId || !info.team1 || !info.team2) continue;
          const score = m?.matchScore || {};
          const team1Inng = score?.team1Score?.inngs1;
          const team2Inng = score?.team2Score?.inngs1;

          out.push({
            matchId: Number(info.matchId),
            seriesName,
            matchDesc: info.matchDesc || '',
            matchFormat: info.matchFormat || '',
            status: info.status || '',
            team1: info.team1,
            team2: info.team2,
            team1Score: this.formatInng(team1Inng),
            team2Score: this.formatInng(team2Inng),
            venueInfo: info.venueInfo || { ground: '', city: '' }
          });
        }
      }
    }
    return out;
  }

  private formatInng(inng: any | undefined): string | undefined {
    if (!inng) return undefined;
    const runs = inng.runs ?? '';
    const wkts = (inng.wickets ?? inng.wickets === 0) ? inng.wickets : '';
    const overs = inng.overs ?? '';
    const wk = wkts === '' ? '' : `/${wkts}`;
    const ov = overs === '' ? '' : ` (${overs} ov)`;
    return `${runs}${wk}${ov}`;
  }
}
