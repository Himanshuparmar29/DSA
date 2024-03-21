#include <iostream>

using namespace std;

class node
{
public:
    int info;
    node *next;
    node *pre;

    node() {}
    node(int x) : info(x)
    {
        next = NULL;
        pre = NULL;
    }

    node *insert(int x)
    {
        node *t = new node(x);
        node *temp = this;
        if (temp->info >= x)
        {
            t->next = temp;
            temp->pre = t;
            return t;
        }
        while (temp->info <= x && temp->next != NULL)
        {
            temp = temp->next;
        }
        if (temp->next != NULL)
        {
            t->pre = temp->pre;
            temp->pre = t;
            t->pre->next = t;
            t->next = temp;
            return this;
        }
        else
        {
            if (temp->info > x)
            {
                t->pre = temp->pre;
                temp->pre = t;
                t->pre->next = t;
                t->next = temp;
                return this;
            }
            else{
                temp->next=t;
                t->pre=temp;
                return this;
            }
        }
    }

    node * del(int x)
    {
        node *temp=this;
        if(temp->info==x){
            return temp->next;
        }
        int flag=0;
        while(temp->next!=NULL && temp->info != x){
            temp=temp->next;
        }
        if(temp->next!=NULL){
            temp->pre->next=temp->next;
            temp->next->pre=temp->pre;
            return this;
        }
        else{
            if(temp->info==x){
                temp->pre->next=NULL;
                return this;
            }
            else{
                cout<<"No information found!\n";
                return this;
            }
        }
    }

    void traverse()
    {
        node *temp=this;
        do{
            cout<<temp->info<<" ";
            temp=temp->next;
        }while(temp!=NULL);
    }
};

int main()
{
    node *head=new node(29);
    head=head->insert(4);
    head=head->insert(37);
    head=head->insert(18);
    head=head->insert(201);
    head=head->del(5);
    head->traverse();
}