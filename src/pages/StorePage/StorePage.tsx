import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FallBack from '../../components/Fallback/FallBack';
import Store from '../../containers/Store/Store';
import { startFetchStore } from '../../store/reducers/store';
import { selectStoreIsLoading } from '../../store/selectors';

const StorePage = () => {
  const isLoading = useSelector(selectStoreIsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('started');

    dispatch(startFetchStore());
  }, [dispatch]);

  return isLoading ? <FallBack /> : <Store />;
};

export default StorePage;
