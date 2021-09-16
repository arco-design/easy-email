import React, { ReactElement } from 'react';
import { IPage } from '../components/core/blocks/basic/Page';
import { BlockType } from '../constants';

export interface IBlock<T extends IBlockData = IBlockData> {
  name: string;
  type: BlockType;
  Panel: () => React.ReactNode;
  createInstance: (payload?: RecursivePartial<T>) => T; //@deprecated , use create
  create: (payload?: RecursivePartial<T>) => T;
  validParentType: BlockType[];
  transform?: (
    data: IBlockData,
    idx: string | null,
    context: IPage
  ) => IBlockData | ReactElement;
}

export interface IBlockData<
  K extends { [key: string]: any } = any,
  T extends { [key: string]: any } = any
> {
  type: BlockType;
  data: {
    value: T;
    hidden?: boolean;
    shadow?: boolean; // Child nodes cannot be selected
  };
  attributes: K & { 'css-class'?: string };
  children: IBlockData[];
}

export interface IEmailTemplate {
  content: IPage;
  subject: string;
  subTitle: string;
}

export interface CreateInstance<T extends any = any> {
  (payload?: RecursivePartial<T>): T;
}

export type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object
    ? RecursivePartial<T[P]>
    : T[P];
};
