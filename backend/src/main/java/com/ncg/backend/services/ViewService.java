package com.ncg.backend.services;

import com.ncg.backend.entities.View;

import java.util.List;
public interface ViewService {

    public List<View> getViews();

    public View getView(long viewId);

    public View addView(View view);

    public View updateView(View view);

    public void deleteView(long l);

}
