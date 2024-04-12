import { useEffect, useState } from 'react';
import { checkApiKey } from '../utils/checkKeys';

import PropTypes from 'prop-types';

const Setting = ({ modalOpen, setModalOpen }) => {
  const apiKey = window.localStorage.getItem('api-key') || '';
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [input, setInput] = useState('');

  const saveKey = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    const keys = input;

    await checkApiKey(keys)
      .then(() => {
        window.localStorage.setItem('api-key', keys);
        console.log('works');
        setModalOpen(false);
      })
      .catch(() => {
        console.log('doesnt work');
        setErrorMsg('error: incorrect keys');
      });

    setLoading(false);
  };

  const removeApiKey = () => {
    window.localStorage.removeItem('api-key');
    setInput('');
  };

  useEffect(() => {
    if (modalOpen) {
      setInput(apiKey);
    }
  }, [apiKey, modalOpen]);

  return (
    <form
      onSubmit={saveKey}
      className='flex flex-col items-center justify-center gap-2'>
      <p className='text-lg font-semibold'>Sử dụng khóa API của riêng bạn.</p>
      <p>các api được lưu trong trình duyệt của riêng bạn</p>
      <p className='italic'>
      Nhận khóa API OpenAI{' '}
        <a
          className='text-blue-600'
          rel='noreferrer'
          target='_blank'
          href='https://note1s.com/notes/V5A95H'>
          here
        </a>
        .
      </p>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type='password'
        className='w-full max-w-xs input input-bordered'
      />
      <button disabled={loading} className='w-full max-w-xs btn btn-outline'>
        {loading ? (
          <>
            <span className='loading loading-spinner' />
            <p>Checking Api Key</p>
          </>
        ) : (
          'lưu vào trình duyệt'
        )}
      </button>
      {apiKey && input && (
        <span
          onClick={removeApiKey}
          disabled={loading}
          className='w-full max-w-xs btn btn-error'>
          remove keys
        </span>
      )}
      <p>{errorMsg}</p>
    </form>
  );
};

export default Setting;

Setting.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  setModalOpen: PropTypes.func.isRequired,
};
