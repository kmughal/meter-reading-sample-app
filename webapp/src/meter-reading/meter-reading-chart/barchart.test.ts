/// <reference path="../../../node_modules/@types/jest/index.d.ts"/>

import { MeterReadingChart } from './MeterReadingChart';
import * as React from 'react'
import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
enzyme.configure({ adapter: new Adapter() });


describe('<MeterReadingChart/> Tests', () => {
  it('should have a heading' ,()=> {
    const comp = enzyme.mount(React.createElement(MeterReadingChart, { chartData: null }));
   console.log(comp.find('h1').length)
  });

  describe('When there is not meter reading', () => {
    it('should not render any bar chart', () => {
      const comp = enzyme.mount(React.createElement(MeterReadingChart, { chartData: null }));
      expect(comp.html() === null).toBeTruthy();
    });
  });
})