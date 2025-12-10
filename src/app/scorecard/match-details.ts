import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CricbuzzService } from '../services/cricbuzz.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-match-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './match-details.html',
  styleUrls: ['./match-details.css']
})
export class MatchDetails implements OnInit {
  matchId: string | null = null;
  loading = true;
  error = '';
  scorecard: any[] = [];
  status = '';
  displayInnings: Array<{
    title: string;
    score: number;
    wickets: number;
    overs: number | string;
    runrate: number | string;
    batsman: any[];
    bowler: any[];
    extras: any;
    fowList: any[];
    partnerships: any[];
    didNotBat: string[];
  }> = [];

  constructor(private route: ActivatedRoute, private api: CricbuzzService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.matchId = this.route.snapshot.paramMap.get('id');
    if (!this.matchId) {
      this.error = 'Invalid match id';
      this.loading = false;
      return;
    }
    this.api
      .getScorecard(this.matchId)
      .pipe(finalize(() => { this.loading = false; this.cdr.detectChanges(); }))
      .subscribe({
        next: (res: any) => {
          this.scorecard = Array.isArray(res?.scorecard) ? res.scorecard : [];
          this.status = res?.status || '';
          this.displayInnings = this.scorecard.map((inn: any) => {
            const title = `${inn.batteamname} ${inn.score}-${inn.wickets} (${inn.overs} Ov)`;
            const bats: any[] = Array.isArray(inn.batsman) ? inn.batsman : [];
            const didNotBat = bats
              .filter(b => (b?.balls ?? 0) === 0 && (b?.runs ?? 0) === 0 && (b?.outdec ?? '') === '')
              .map(b => b?.name)
              .filter(Boolean);
            const fowList = inn?.fow?.fow || [];
            const partnerships = inn?.partnership?.partnership || [];
            return {
              title,
              score: inn.score,
              wickets: inn.wickets,
              overs: inn.overs,
              runrate: inn.runrate,
              batsman: bats,
              bowler: Array.isArray(inn.bowler) ? inn.bowler : [],
              extras: inn.extras || {},
              fowList,
              partnerships,
              didNotBat
            };
          });
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error(err);
          this.error = 'Failed to load scorecard.';
          this.cdr.detectChanges();
        }
      });
  }
}
