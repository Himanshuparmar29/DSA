#include <bits/stdc++.h>
using namespace std;
class node
{
    int val;
    node *left;
    node *right;

public:
    node(int a)
    {
        left = nullptr;
        right = nullptr;
        val = a;
    }
    void append(node *b)
    {
        if (this->val < b->val)
        {
            if (this->right == nullptr)

                this->right = b;

            else

                this->right->append(b);
        }
        else
        {
            if (this->left == nullptr)

                this->left = b;

            else

                this->left->append(b);
        }
    }
    void inorder()
    {
        if (this->left != nullptr)
            this->left->inorder();
        
        cout<<this->val<<" ";
        if (this->right != nullptr)
            this->right->inorder();
    }
};
int main()
{
    node a(4);
    node *b=new node(2);
    a.append(b);
    b=new node(7);
    a.append(b);
    b=new node(1);
    a.append(b);
    b=new node(9);
    a.append(b);
    b=new node(10);
    a.append(b);
    a.inorder();
}