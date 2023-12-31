import React from 'react';
import { shallow } from 'enzyme';
import { CreateExperimentModalImpl } from './CreateExperimentModal';
import { GenericInputModal } from './GenericInputModal';

describe('CreateExperimentModal', () => {
  let wrapper: any;
  let instance;
  let minimalProps: any;
  let location = {};
  const fakeExperimentId = 'fakeExpId';
  beforeEach(() => {
    location = { search: 'initialSearchValue' };
    const history = {
      push: (url: any) => {
        (location as any).search = url;
      },
    };
    minimalProps = {
      isOpen: false,
      onClose: jest.fn(),
      experimentNames: [],
      createExperimentApi: (experimentName: any, artifactLocation: any) => {
        const response = { value: { experiment_id: fakeExperimentId } };
        return Promise.resolve(response);
      },
      searchExperimentsApi: () => Promise.resolve([]),
      history: history,
    };
    wrapper = shallow(<CreateExperimentModalImpl {...minimalProps} />);
  });
  test('should render with minimal props without exploding', () => {
    wrapper = shallow(<CreateExperimentModalImpl {...minimalProps} />);
    expect(wrapper.find(GenericInputModal).length).toBe(1);
    expect(wrapper.length).toBe(1);
  });
  test('handleCreateExperiment redirects user to newly-created experiment page', (done) => {
    instance = wrapper.instance();
    instance
      .handleCreateExperiment({ experimentName: 'myNewExp', artifactLocation: 'artifactLoc' })
      .then(() => {
        expect((location as any).search).toEqual('/experiments/fakeExpId');
        done();
      });
  });
  test('handleCreateExperiment does not perform redirection if API requests fail', (done) => {
    const propsVals = [
      {
        ...minimalProps,
        searchExperimentsApi: () => Promise.reject(new Error('SearchExperiments failed!')),
      },
      {
        ...minimalProps,
        createExperimentApi: () => Promise.reject(new Error('CreateExperiment failed!')),
      },
    ];
    const testPromises: any = [];
    propsVals.forEach((props) => {
      wrapper = shallow(<CreateExperimentModalImpl {...props} />);
      instance = wrapper.instance();
      const payload = { experimentName: 'myNewExp', artifactLocation: 'artifactLoc' };
      testPromises.push(expect(instance.handleCreateExperiment(payload)).rejects.toThrow());
    });
    Promise.all(testPromises).then(() => {
      expect((location as any).search).toEqual('initialSearchValue');
      done();
    });
  });
});
