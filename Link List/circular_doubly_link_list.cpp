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

    void append(int x)
    {
        node *t = new node(x);
        node *temp = this;
        if (temp->next == NULL)
        {
            temp->next = t;
            temp->pre = t;
            t->next = temp;
            t->pre = temp;
            return;
        }
        temp = temp->next;
        while (temp->next != this)
        {
            temp = temp->next;
        }
        temp->next = t;
        t->pre = temp;
        t->next = this;
        this->pre = t;
    }

    void traverse()
    {
        node *temp = this;
        if(temp->next==NULL){
            cout<<temp->info<<endl;
        }
        else
        {
            do
            {
                cout<<temp->info<<" ";
                temp=temp->next;
            }while(temp!=this);
        }
    }
};


int main()
{
    node *head=new node(29);
    head->append(18);
    head->append(4);
    head->traverse();
}