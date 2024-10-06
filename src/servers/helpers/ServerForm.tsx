/* eslint-disable @typescript-eslint/no-unused-expressions */
import { InputFormGroup, SimpleCard } from '@shlinkio/shlink-frontend-kit';
import type { FC, PropsWithChildren, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { handleEventPreventingDefault } from '../../utils/utils';
import type { ServerData } from '../data';

type ServerFormProps = PropsWithChildren<{
  onSubmit: (server: ServerData) => void;
  initialValues?: ServerData;
  title?: ReactNode;
}>;

export const ServerForm: FC<ServerFormProps> = ({ onSubmit, initialValues, children, title }) => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [apiKey, setApiKey] = useState('');
  const handleSubmit = handleEventPreventingDefault(() => onSubmit({ name, url, apiKey }));

  useEffect(() => {
    initialValues && setName(initialValues.name);
    initialValues && setUrl(initialValues.url);
    initialValues && setApiKey(initialValues.apiKey);
  }, [initialValues]);

  return (
    <form className="server-form" name="serverForm" onSubmit={handleSubmit}>
      <SimpleCard className="mb-3" title={title}>
        <InputFormGroup value={name} onChange={setName}>Name</InputFormGroup>
        <InputFormGroup type="url" value={url} onChange={setUrl}>Server URL</InputFormGroup>
        <InputFormGroup value={apiKey} onChange={setApiKey} type="password">API key</InputFormGroup>
      </SimpleCard>

      <div className="text-end">{children}</div>
    </form>
  );
};
