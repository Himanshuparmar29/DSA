#include<iostream>
#define n 5
using namespace std;

class cq
{
    public:
    int a[n];
    int front;
    int rear;
    cq(){
        front=-1;
        rear=-1;
    }
    void add(int x)
    {
        if(front==-1 && rear==-1)
        {
            front=++rear;
            a[rear]=x;
        }
        else if((rear+1)%n==front)
        {
            cout<<"Over";
        }
        else{
            if((rear+1)%n==0){
                rear=0;
            }
            else{
                rear++;
            }
            a[rear]=x;
        }
    }

    void remove()
    {
        if(front==-1 && rear==-1){
            cout<<"jh";
        }
        else{
            if(front==rear){
                front=rear=-1;
            }
            else{
                front=(front+1)%n;
            }
        }
    }
    void display()
    {
        int c=((rear+n-front)%n)+1;
        for(int i=0;i<c;i++)
        {
            cout<<a[(front+i)%n]<<" ";
        }
    }
};

int main()
{
    cq q;
    q.add(29);
    q.remove();
    q.remove();
    q.add(37);
    q.add(18);
    q.add(4);
    q.add(71);
    // q.add(44);
    // q.add(201);
    q.display();
}