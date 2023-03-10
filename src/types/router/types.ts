import { Component } from "../components";

export type Route = {
  path: string;
  component: Component;
};

export type HistoryListenCallback = (pathname: string) => void;

export type RouterListenCallback = (route: Route | null) => any;

export type History = {
  listen: (callback: HistoryListenCallback) => void;
  push: (pathname: string) => void;
  replace: (pathname: string) => void;
}

export type RouterConfig = {
  routes: Route[];
};

export type Router = {
  getHistory: () => History | null;
  getRoutes: () => Route[];
  registerHistory: (history: History) => void,
  registerRoutes: (routes: Route[]) => void,
  navigateTo: (pathname: string) => void,
  listen: (callback: RouterListenCallback) => void,
}
