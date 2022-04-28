import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsArchiveComponent } from './posts-archive.component';

describe('PostsArchiveComponent', () => {
  let component: PostsArchiveComponent;
  let fixture: ComponentFixture<PostsArchiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostsArchiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
