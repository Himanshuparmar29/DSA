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
    node *add(int x)
    {
        node *t = new node(x);
        node *temp1 = this;
        node *temp2;
        if (temp1->info >= x)
        {
            t->next = temp1;
            return t;
        }
        while (temp1->next != NULL && temp1->info < x)
        {
            temp2 = temp1;
            temp1 = temp1->next;
        }
        if (temp1->next != NULL)
        {
            temp2->next = t;
            t->next = temp1;
            return this;
        }
        else
        {
            if (temp1->info > x)
            {
                temp2->next = t;
                t->next = temp1;
                return this;
            }
            temp1->next=t;
            return this;
        }
    }

    void display()
    {
        node *temp = this;
        do
        {
            cout << temp->info << " ";
            temp = temp->next;
        } while (temp != NULL);
    }
};

int main()
{
    node *head = new node(29);
    head = head->add(71);
    head = head->add(18);
    head = head->add(30);
    head = head->add(29);
    head = head->add(4);
    head = head->add(28);
    head->display();
}