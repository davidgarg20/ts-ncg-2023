package com.ncg.backend.services;

import com.ncg.backend.entities.View;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import com.ncg.backend.dao.ViewDao;
import org.springframework.stereotype.Service;

@Service
public class ViewServiceImpl implements ViewService {

    @Autowired
    private ViewDao viewDao;
    @Override
    public List<View> getViews() {
        return viewDao.findAll();
    }

    @Override
    public View getView(long viewId) {
        return viewDao.getById(viewId);
    }

    @Override
    public View addView(View view) {
        return viewDao.save(view);
    }

    @Override
    public View updateView(View view) {
        return viewDao.save(view);
    }

    @Override
    public void deleteView(long l) {
        View view = viewDao.getById(l);
        viewDao.delete(view);
    }
}
