import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FallBack from '../../components/Fallback/FallBack';
import Store from '../../containers/Store/Store';
import { startFetchStore } from '../../store/reducers/store';
import { selectStoreIsLoading } from '../../store/selectors';
import { FetchingProcess } from '../../types/store';
import NotFoundPage from '../NotFoundPage';

const StorePage = () => {
  const loadingProcess = useSelector(selectStoreIsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startFetchStore());
  }, [dispatch]);

  switch (loadingProcess) {
    case FetchingProcess.loaded:
      return <Store />;
    case FetchingProcess.loading:
      return <FallBack />;
    case FetchingProcess.failed:
      return <NotFoundPage />;
    default:
      return <FallBack />;
  }
};

export default StorePage;
