import React, { FC, PropsWithChildren } from 'react';

export const Callout: FC<
  PropsWithChildren<{
    title: string;
  }>
> = ({ title, children }) => {
  return (
    <div className="flex flex-col md:flex-row items-center pb-4 gap-x-4 font-sans">
      <div className="flex flex-col gap-2 grow items-center md:items-start">
        <h1 className="text-xl font-medium">{title}</h1>
        <div className="bg-moss/20 rounded-md w-full p-4 text-sm">
          <p>{children}</p>
        </div>
      </div>
    </div>
  );
};
