#include<iostream>

using namespace std;

class node
{
    public:
    int info;
    node *next;
    node()
    {}
    node(int x):info(x)
    {
        next=NULL;
    }
    node * append(int x)
    {
        node *t=new node(x);
        node *temp=this;
        while(temp->next!=NULL)
        {
            temp=temp->next;
        }
        temp->next=t;
        return t;
    }
    node * del()
    {
        node *temp=this;
        cout<<temp->info<<endl;
        return temp->next;
    }
    void display()
    {
        node *temp=this;
        do{
            cout<<temp->info<<" ";
            temp=temp->next;
        }while(temp!=NULL);
    }
};

class queue{
    public:
    node * front;
    node * rear;
    queue(){
        front=NULL;
        rear=NULL;
    }
    void add(int x)
    {
        if(front==NULL)
        {
            node *t=new node(x);
            front=t;
            rear=t;
        }
        else{
            rear=front->append(x);
        }
    }
    void remove()
    {
        if(front==NULL){
            cout<<"Underflow!";
            return;
        }
        front=front->del();
    }
    void display()
    {
        front->display();
    }
};

int main()
{
    queue q;
    q.add(29);
    q.add(37);
    q.add(44);
    q.display();
    cout<<endl;
    q.remove();
    q.remove();
    q.remove();
    q.remove();
    
    
}