import type { IContainer } from 'bottlejs';
import Bottle from 'bottlejs';
import { connect as reduxConnect } from 'react-redux';
import { provideServices as provideApiServices } from '../api/services/provideServices';
import { provideServices as provideAppServices } from '../app/services/provideServices';
import { provideServices as provideCommonServices } from '../common/services/provideServices';
import { provideServices as provideServersServices } from '../servers/services/provideServices';
import { provideServices as provideSettingsServices } from '../settings/services/provideServices';
import { provideServices as provideUtilsServices } from '../utils/services/provideServices';
import type { ConnectDecorator } from './types';

type LazyActionMap = Record<string, (...arg0:any[])=>any>;

const bottle = new Bottle();

export const { container } = bottle;

const lazyService = <T extends (...arg0:any[])=>any, K>(cont: IContainer, serviceName: string) =>
  (...args: any[]) => (cont[serviceName] as T)(...args) as K;

const mapActionService = (map: LazyActionMap, actionName: string): LazyActionMap => ({
  ...map,
  // Wrap actual action service in a function so that it is lazily created the first time it is called
  [actionName]: lazyService(container, actionName),
});

const pickProps = (propsToPick: string[]) => (obj: any) => Object.fromEntries(
  propsToPick.map((key) => [key, obj[key]]),
);

const connect: ConnectDecorator = (propsFromState: string[] | null, actionServiceNames: string[] = []) =>
  reduxConnect(
    propsFromState ? pickProps(propsFromState) : null,
    actionServiceNames.reduce(mapActionService, {}),
  );

provideAppServices(bottle, connect);
provideCommonServices(bottle, connect);
provideApiServices(bottle);
provideServersServices(bottle, connect);
provideUtilsServices(bottle);
provideSettingsServices(bottle, connect);
