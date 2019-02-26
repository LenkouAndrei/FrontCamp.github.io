import {FcSourceNameComponent} from './fc-source-name';
import {Component, Input} from '@angular/core';
import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';

@Component({
  template: `<fc-source-name [sourceName]="sourceName"></fc-source-name>`,
})
export class TestFcSourceNameComponent {
  public sourceName: string = 'FAKE_NAME';
}

describe('FcSourceNameComponent', () => {
  let fixture: ComponentFixture<any>;
  let hostInstance: TestFcSourceNameComponent;
  const FAKE_NAME = 'FAKE_NAME';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [FcSourceNameComponent, TestFcSourceNameComponent]
    }).compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TestFcSourceNameComponent);
    hostInstance = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should bind new item tex to input', fakeAsync(() => {
    const NEW_TEXT = 'NEW_TEXT';
    hostInstance.sourceName = NEW_TEXT;

    fixture.detectChanges();
    tick();

    expect(getByCss('.source-name--headline').textContent).toBe(NEW_TEXT);
  }));

  function getByCss(selector: string) {
    const element = fixture.debugElement.query(By.css(selector));
    return element && element.nativeElement;
  }
});
