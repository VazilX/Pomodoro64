/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useRef, useState } from 'react';
import './AddTaskForm.scss';
import { Task } from '../../types/Task';
import classNames from 'classnames';

type Props = {
  onClose: () => void;
  onSave: (t: string, d: string) => void;
  task?: Task;
};

export const AddTaskForm: React.FC<Props> = ({
  onClose,
  onSave,
  task = { title: '', description: '' },
}) => {
  const [title, setTitle] = useState(task.title);
  const [desc, setDesc] = useState(task.description);
  const [hasError, setHasError] = useState(false);
  const refDesc = useRef<HTMLTextAreaElement>(null);
  const refDescDiv = useRef<HTMLDivElement>(null);

  const resizeDiv = () => {
    const textarea = refDesc.current;
    const div = refDescDiv.current;

    if (div && textarea) {
      div.style.width = `${textarea.clientWidth}px`;
    }
  };

  useEffect(() => {
    const div = refDescDiv.current;
    const textarea = refDesc.current;

    if (div && textarea) {
      resizeDiv();

      window.addEventListener('resize', resizeDiv);
    }

    return window.removeEventListener('resize', resizeDiv);
  }, [refDescDiv, refDesc]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setHasError(false);
  };

  const onChangeDesc = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDesc(e.target.value);
    const textarea = refDesc.current;
    const div = refDescDiv.current;

    if (textarea && div) {
      const minDescHight = parseInt(getComputedStyle(textarea).lineHeight) * 2;

      if (div.clientHeight > minDescHight) {
        textarea.style.height = `${div.clientHeight}px`;
      }
    }
  };

  const validation = () => {
    const trimedTitle = title.trim();

    if (!trimedTitle) {
      setHasError(true);

      return false;
    }

    return true;
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validation()) {
      return;
    }

    const trimedTitle = title.trim();
    const trimedDesc = desc.trim();

    setDesc('');
    setTitle('');

    onSave(trimedTitle, trimedDesc);

    onClose();
  };

  return (
    <form className="add-task-form cell" onSubmit={onSubmit}>
      <input
        type="text"
        name="input-title"
        className={classNames(
          'add-task-form__input',
          'add-task-form__input--title',
          { 'add-task-form__input--err': hasError },
        )}
        placeholder="Task title"
        value={title}
        onChange={onChangeTitle}
      />
      <textarea
        name="input-description"
        placeholder="Task description"
        value={desc}
        onChange={onChangeDesc}
        className="add-task-form__input add-task-form__input--desc"
        ref={refDesc}
      ></textarea>

      <div className="add-task-form__check-desc-h" ref={refDescDiv}>
        {desc}
      </div>

      <button type="submit" className="add-task-form__btn"></button>
    </form>
  );
};
