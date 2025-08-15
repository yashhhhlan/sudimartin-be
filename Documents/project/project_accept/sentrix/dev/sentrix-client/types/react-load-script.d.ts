declare module 'react-load-script' {
  import { Component } from 'react';

  export interface ScriptProps {
    url: string;
    onCreate?: () => void;
    onError?: (error: any) => void;
    onLoad?: () => void;
    attributes?: { [key: string]: string | boolean };
  }

  export default class Script extends Component<ScriptProps> {}
}
