import { Reducer } from 'redux';
import { message } from 'antd';
import defaultSettings, { DefaultSettings } from '../../config/defaultSettings';
import themeColorClient from '../components/SettingDrawer/themeColorClient';

export interface SettingModelType {
  namespace: 'settings';
  state: DefaultSettings;
  reducers: {
    getSetting: Reducer<DefaultSettings>;
    changeSetting: Reducer<DefaultSettings>;
  };
}

const updateTheme = (newPrimaryColor?: string) => {
  if (newPrimaryColor) {
    const timeOut = 0;
    const hideMessage = message.loading('Switching theme!', timeOut);
    themeColorClient.changeColor(newPrimaryColor).finally(() => hideMessage());
  }
};

const updateColorWeak: (colorWeak: boolean) => void = colorWeak => {
  console.log('colorWeak', colorWeak)
  const root = document.getElementById('root');
  if (root) {
    root.className = colorWeak ? 'colorWeak' : '';
  }
};

const SettingModel: SettingModelType = {
  namespace: 'settings',
  state: defaultSettings,
  reducers: {
    getSetting(state = defaultSettings) {
      const setting: Partial<DefaultSettings> = {};
      // const urlParams = new URL(window.location.href);
      const newState = { ...state, ...localStorage };
      Object.keys(state).forEach(key => {
        switch (newState[key]) {
          case 'undefined':
            newState[key] = undefined;
            break;
          case 'true':
            newState[key] = true;
            break;
          case 'false':
            newState[key] = false;
            break;
          default:
            break;
        }
        if (newState[key]) {
          setting[key] = newState[key] === '1' ? true : newState[key];
        }
      });
      const { primaryColor, colorWeak } = setting;
      if (primaryColor && state.primaryColor !== primaryColor) {
        updateTheme(primaryColor);
      }
      updateColorWeak(!!colorWeak);
      return {
        ...state,
        ...setting,
      };
    },
    changeSetting(state = defaultSettings, { payload }) {
      Object.keys(payload).forEach(key => {
        if (key === 'collapse') {
          return;
        }
        let value = payload[key];
        if (value === true) {
          value = 1;
        }
        if (defaultSettings[key] !== value) {
          // urlParams.searchParams.set(key, value);
          localStorage.setItem(key, value);
        }
      });
      // Object.keys(payload).forEach(key => {
      //   localStorage.setItem(key, payload[key]);
      // })
      const { primaryColor, colorWeak, contentWidth } = payload;
      if (primaryColor && state.primaryColor !== primaryColor) {
        updateTheme(primaryColor);
      }
      if (state.contentWidth !== contentWidth && window.dispatchEvent) {
        window.dispatchEvent(new Event('resize'));
      }
      updateColorWeak(!!colorWeak);
      // window.history.replaceState(null, 'setting', urlParams.href);
      return {
        ...state,
        ...payload,
      };
    },
  },
};
export default SettingModel;
