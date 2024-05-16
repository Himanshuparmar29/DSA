#include<iostream>

using namespace std;

class node
{
    int info;
    node *next;
    node *pre;
    public:
    node(){}
    node(int x):info(x)
    {
        next=NULL;
        pre=NULL;
    }

    node * append(int x)
    {
        node *t=new node(x);
        node *temp=this;
        if(temp->info >= x)
        {
            temp->next=t;
            t->next=
        }
    }
};