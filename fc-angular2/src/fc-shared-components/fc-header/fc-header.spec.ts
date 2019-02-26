import {FcHeaderComponent} from './fc-header';

describe('FcHeaderComponent', () => {
  it('should contain "userLogin" property', () => {
    const fcHeader = new FcHeaderComponent();
    expect(fcHeader.userLogin).toEqual('User Login');
  });

  it('should contain "buttonName" property', () => {
    const fcHeader = new FcHeaderComponent();
    expect(fcHeader.buttonName).toEqual('Log out');
  });
});
