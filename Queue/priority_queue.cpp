#include <iostream>

using namespace std;

class node
{
public:
    int info;
    node *next;
    node() {}
    node(int x) : info(x)
    {
        next = NULL;
    }

    node * add(int x)
    {
        node * t=new node (x);
        node *temp1=this;
        node *temp2;
        while(temp1->info<=x && temp1->next!=NULL)
        {
            temp2=temp1;
            temp1=temp1->next;
        }
        if(temp1->next==NULL)
        {
            temp1->next=t;
            return t;
        }
        else{
            temp2->next=t;
            t->next=temp1;
            return temp1;
        }
    }
};

class pqueue
{
    node *front;
    node *rear;

public:
    pqueue()
    {
        front = NULL;
        rear = NULL;
    }

    void add(int x)
    {
        if (front == NULL)
        {
            node *t = new node(x);
            front = t;
            rear = t;
        }
        else if (front->info >= x)
        {
            node *t = new node(x);
            t->next = front;
            front = t;
        }
        else
        {
            rear = front->add(x);
        }
    }

    void display()
    {
        node *t=front;
        do{
            cout<<t->info<<" ";
            t=t->next;
        }while(t!=NULL);
    }

    void remove()
    {
        if(front==NULL){
            cout<<"Queue is empty!";
        }
        else{
            cout<<front->info<<" ";
            front=front->next;
        }
        cout<<endl;
    }
};

int main()
{
    pqueue pq;
    pq.add(29);
    pq.add(18);
    pq.add(37);
    pq.add(201);
    pq.add(4);
    pq.add(71);
    pq.display();
    cout<<endl;
    pq.remove();
    pq.remove();
    pq.remove();
    pq.remove();
    pq.remove();
    pq.remove();
}