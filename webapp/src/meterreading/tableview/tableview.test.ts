/// <reference path="../../../node_modules/@types/jest/index.d.ts"/>

import * as React from 'react';
import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { MeterReadingTable } from './MeterReadingTable';
import { MeterReadings, MeterReading } from './model/Index';

const sampleData = require('../../data/meterReadingsSample.json');
enzyme.configure({ adapter: new Adapter() });

const fakeMeterReadingList = sampleData.electricity.map(
  meterReading =>
    new MeterReading(
      meterReading.cumulative,
      0,
      meterReading.ReaderDate,
      meterReading.unit
    )
);

const fakeMeterReading = new MeterReadings(fakeMeterReadingList);

describe('<MeterReadingTable /> Tests', () => {
  let wrapper = null;

  beforeEach(
    () =>
      (wrapper = enzyme.mount(React.createElement(MeterReadingTable, { tableData: fakeMeterReading })
      ))
  );

  it('should contain 14 entries after loading the sample data.', () =>
    expect(wrapper.find('tbody tr').length).toEqual(14));

  it('should contain three headings', () =>
    expect(wrapper.find('thead tr th').length).toEqual(3));

  describe('when meter reading is empty', () => {
    it('should have nothing', () => {
      const emptyMeterReadingList = new MeterReadings(
        new Array<MeterReading>()
      );
      const emptyComponent = enzyme.mount(React.createElement(MeterReadingTable, { tableData: emptyMeterReadingList }));
      expect(emptyComponent.html() === null).toBeTruthy();
    });
  });
});
