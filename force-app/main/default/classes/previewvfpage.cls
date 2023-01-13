public with sharing class previewvfpage {
    public PageReference displayName() {
        String myID='place your Id here';
        System.debug(myID);
        String ss = ApexPages.currentPage().getParameters().get('id');
        System.debug(ss);
        PageReference pg=new PageReference('/test');
        System.debug(pg);
        pg.getParameters().put('id', myID);
        pg.setRedirect(true);
        System.debug(pg);
        return pg;
    }
}