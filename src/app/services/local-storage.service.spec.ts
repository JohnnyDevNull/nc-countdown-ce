import { LocalStorageService } from './local-storage.service';

const documentMock = {
  defaultView: {
    localStorage: {
      setItem: jest.fn(),
      getItem: jest.fn()
    }
  }
}

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    service = new LocalStorageService(documentMock as unknown as Document);
  })

  it('should set data', () => {
    const setDataSpy = jest.spyOn(documentMock.defaultView.localStorage, 'setItem');
    service.set({ title: 'some title' });
    expect(setDataSpy).toHaveBeenCalledWith('countdownData', JSON.stringify({ title: 'some title' }));
  })

  it('should get null data', () => {
    const getDataSpy = jest.spyOn(documentMock.defaultView.localStorage, 'getItem').mockReturnValue(null);
    expect(service.get()).toBeNull();
    expect(getDataSpy).toHaveBeenCalledWith('countdownData');
  })

  it('should get concrete data data', () => {
    const getDataSpy = jest.spyOn(documentMock.defaultView.localStorage, 'getItem').mockReturnValue(JSON.stringify({ title: 'some title' }));
    expect(service.get()).toStrictEqual({ title: 'some title' });
    expect(getDataSpy).toHaveBeenCalledWith('countdownData');
  })

  it('should save data', () => {
    const getDataSpy = jest.spyOn(documentMock.defaultView.localStorage, 'getItem').mockReturnValue(JSON.stringify({ date: '2024-04-07T15:00:00Z' }));
    const setDataSpy = jest.spyOn(documentMock.defaultView.localStorage, 'setItem');
    service.save({ title: 'some title' });
    expect(getDataSpy).toHaveBeenCalledWith('countdownData');
    expect(setDataSpy).toHaveBeenCalledWith('countdownData', JSON.stringify({ date: '2024-04-07T15:00:00Z', title: 'some title' }));
  })
})
