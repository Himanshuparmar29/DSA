#include<iostream>
#define SIZE 5
using namespace std;
class queue
{
 int arr[SIZE];
 int front;
 int rear;
 public:
  queue(){
    front=-1;
    rear=-1;
  }
  int overflow(){
    return (rear+1)%SIZE==front?1:0;
  }
  void add(int x)
  {
    if(front==-1&&rear==-1)
    {
        front++;
        arr[++rear]=x;
    }
    else if(overflow()){
        cout<<"Queue Overflow!";
    }
    else{
        if((rear+1)%SIZE==0){
            rear=0;
        }
        else{
            rear++;
        }
        arr[rear]=x;
    }
  }

  void display()
  {
    int count=((rear+SIZE-front)%SIZE)+1;
    for(int i=0;i<count;i++)
    {
        cout<<arr[(front+i)%SIZE]<<" ";
    }
  }

  void remove()
  {
    if(rear==-1&&front==-1){
        cout<<"Queue is empty";
    }
    else if(front==rear){
        front=rear=-1;
    }
    else{
        front=(front+1)%SIZE;
    }
  }
};

int main()
{
    queue q;
    q.add(29);
    q.remove();
    q.remove();
    q.add(37);
    // q.add(18);
    // q.add(4);
    // q.add(71);
    // q.add(44);
    // q.add(201);
    q.display();
}