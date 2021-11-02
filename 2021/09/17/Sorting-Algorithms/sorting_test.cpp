#include<iostream>
#include<time.h>
#include<vector>
#include<stdlib.h>
using namespace std;

// sorting algorithms
void Bubble_Sort(vector<int>& vec);
void Selection_Sort(vector<int>& vec);
void Insertion_Sort(vector<int>& vec);
void Merge(vector<int>& vec, int start_index, int end_index);
void Merge_Sort(vector<int>& vec, int start_index, int end_index);
void Quick_Sort(vector<int>& vec, int start_index, int end_index);
void Heap_Sort(vector<int>& vec);
void Bucket_Sort(vector<int>& vec);
void Shell_Sort(vector<int>& vec);

// utils
void shuffle_vector(vector<int>& vec)
{
    // init random seed
    srand((unsigned)time(NULL)); 
    for(int i=vec.size()-1; i>=0; i--)
    {
        int seed = rand() % (i+1);
        swap(vec[seed], vec[i]);
    }
}
void show_vector(vector<int>& vec)
{
    for(auto i:vec)
    {
        cout<<i<<" ";
    }
    cout<<endl;
}
bool check_vector(vector<int>& vec1, vector<int>& vec2)
{
    if(vec1.size()!=vec2.size())
    {
        cout<<"vector size does not match"<<endl;
        return false;
    }
    int n=vec1.size();
    for(int i=0; i<n; i++)
    {
        if(vec1[i]==vec2[i])    continue;
        else    return false;
    }
    return true;
}
double average_vector(vector<double>& vec)
{
    double sum=0;
    for(auto i:vec) sum+=i;
    return sum/(double)vec.size();
}

int main()
{
    clock_t start;
    clock_t end;

    // generate data
    vector<int> input;
    for(int i=0; i<10000; i++)  input.push_back(rand()%1000);
    vector<int> sorted;
    vector<double> time_consumed(10, 0);

    // show_vector(input);

    // Note: it seems the cache will affact the performance, so load the cache first.
    for(int i=0; i<10; i++)
    {
        shuffle_vector(input);
        Bucket_Sort(input);
        sorted=input; // get sorted list
    }

    //////////////////////////////////////////////////////////////////////////////////////////

    // Bubble Sort
    for(int i=0; i<10; i++)
    {
        shuffle_vector(input);
        start=clock();
        Bubble_Sort(input);
        end=clock();
        if(check_vector(sorted, input))   time_consumed[i]=(double)(end-start)/CLOCKS_PER_SEC*1000;
        else    
        {
            cout<<"Bubble Sort failed!"<<endl;
            return 0;
        }
    }
    cout<<left<<"Bubble Sort: "<<average_vector(time_consumed)<<"ms"<<endl;

    // Insertion Sort
    for(int i=0; i<10; i++)
    {
        shuffle_vector(input);
        start=clock();
        Insertion_Sort(input);
        end=clock();
        if(check_vector(sorted, input))   time_consumed[i]=(double)(end-start)/CLOCKS_PER_SEC*1000;
        else    
        {
            cout<<"Insertion Sort failed!"<<endl;
            return 0;
        }
    }
    cout<<left<<"Insertion Sort: "<<average_vector(time_consumed)<<"ms"<<endl;

    // Selection Sort
    for(int i=0; i<10; i++)
    {
        shuffle_vector(input);
        start=clock();
        Selection_Sort(input);
        end=clock();
        if(check_vector(sorted, input))   time_consumed[i]=(double)(end-start)/CLOCKS_PER_SEC*1000;
        else    
        {
            cout<<"Selection Sort failed!"<<endl;
            return 0;
        }
    }
    cout<<left<<"Selection Sort: "<<average_vector(time_consumed)<<"ms"<<endl;

    // Merge Sort
    for(int i=0; i<10; i++)
    {
        shuffle_vector(input);
        start=clock();
        // input.size()-1
        Merge_Sort(input, 0, input.size()-1);
        end=clock();
        if(check_vector(sorted, input))   time_consumed[i]=(double)(end-start)/CLOCKS_PER_SEC*1000;
        else    
        {
            cout<<"Merge Sort failed!"<<endl;
            return 0;
        }
    }
    cout<<left<<"Merge Sort: "<<average_vector(time_consumed)<<"ms"<<endl;

    // Heap Sort
    for(int i=0; i<10; i++)
    {
        shuffle_vector(input);
        start=clock();
        Heap_Sort(input);
        end=clock();
        if(check_vector(sorted, input))   time_consumed[i]=(double)(end-start)/CLOCKS_PER_SEC*1000;
        else    
        {
            cout<<"Heap failed!"<<endl;
            return 0;
        }
    }
    cout<<left<<"Heap Sort: "<<average_vector(time_consumed)<<"ms"<<endl;

    // Shell Sort
    for(int i=0; i<10; i++)
    {
        shuffle_vector(input);
        start=clock();
        Shell_Sort(input);
        end=clock();
        if(check_vector(sorted, input))   time_consumed[i]=(double)(end-start)/CLOCKS_PER_SEC*1000;
        else    
        {
            cout<<"Shell failed!"<<endl;
            return 0;
        }
    }
    cout<<left<<"Shell Sort: "<<average_vector(time_consumed)<<"ms"<<endl;

    // Quick Sort
    for(int i=0; i<10; i++)
    {
        shuffle_vector(input);
        start=clock();
        // input.size()-1
        Quick_Sort(input, 0, input.size()-1);
        end=clock();
        if(check_vector(sorted, input))   time_consumed[i]=(double)(end-start)/CLOCKS_PER_SEC*1000;
        else    
        {
            cout<<"Quick Sort failed!"<<endl;
            return 0;
        }
    }
    cout<<left<<"Quick Sort: "<<average_vector(time_consumed)<<"ms"<<endl;

    // Bucket Sort
    for(int i=0; i<10; i++)
    {
        shuffle_vector(input);
        start=clock();
        Bucket_Sort(input);
        end=clock();
        if(check_vector(sorted, input))   time_consumed[i]=(double)(end-start)/CLOCKS_PER_SEC*1000;
        else    
        {
            cout<<"Bucket failed!"<<endl;
            return 0;
        }
    }
    cout<<left<<"Bucket Sort: "<<average_vector(time_consumed)<<"ms"<<endl;

    return 0;
}

void Bubble_Sort(vector<int>& vec)
{
    int length=vec.size();
    if(length==0)   return;
    for(int i=0; i<length-1; i++)
    {
        for(int j=0; j<length-i-1; j++)
        {
            if(vec[j]>vec[j+1]) swap(vec[j], vec[j+1]);
        }
    }
}
void Selection_Sort(vector<int>& vec)
{
    int length=vec.size();
    if(length==0)   return;
    for(int i=0; i<length-1; i++)
    {
        int smallest_index=i;
        for(int j=i+1; j<length; j++)
        {
            if(vec[j]<vec[smallest_index])   smallest_index=j;
        }
        swap(vec[smallest_index], vec[i]);
    }
}
void Insertion_Sort(vector<int>& vec)
{
    int length=vec.size();
    if(length==0)   return;
    for(int i=1; i<vec.size(); i++)
    {
        int insertion_index=i;
        for(int j=i-1; j>=0; j--)
        {
            if(vec[j]>vec[insertion_index])
            {
                swap(vec[j], vec[insertion_index]);
                insertion_index=j;
            }
            else    break;
        }
    }
}
void Merge(vector<int>& vec, int start_index, int end_index)
{
    int length=end_index-start_index+1;
    int left_start_index=start_index;
    int left_end_index=(start_index+end_index)/2;
    int right_start_index=(start_index+end_index)/2+1;
    int right_end_index=end_index;

    vector<int> tmp_vec(length);
    for(int i=0; i<length; i++)
    {
        if(left_start_index<=left_end_index && right_start_index<=right_end_index)
        {
            if(vec[left_start_index]<vec[right_start_index])
                tmp_vec[i]=vec[left_start_index++];
            else    
                tmp_vec[i]=vec[right_start_index++];
        }
        else 
        {
            if(right_start_index>right_end_index)    tmp_vec[i]=vec[left_start_index++];
            else    tmp_vec[i]=vec[right_start_index++];
        }
    }

    for(int i=0; i<length; i++) vec[start_index+i]=tmp_vec[i];

}
void Merge_Sort(vector<int>& vec, int start_index, int end_index)
{
    int length=end_index-start_index+1;
    if(length==0)   return;
    if(end_index>start_index)
    {
        Merge_Sort(vec, start_index, (start_index+end_index)/2);
        Merge_Sort(vec, (start_index+end_index)/2+1, end_index);
        Merge(vec, start_index, end_index);
    }
}
void Quick_Sort(vector<int>& vec, int start_index, int end_index)
{
    if(start_index>=end_index)  return; // >=
    int i = start_index, j = end_index+1, pivot = vec[start_index];;
    while(true)
    {
        // the key point is '++i' and '--j'
        while(vec[++i]<pivot && i!=end_index); // find the first greater element
        while(vec[--j]>pivot && j!=start_index); // find the first smaller element
        if(i>=j)    break;
        swap(vec[i], vec[j]);
    }
    swap(vec[start_index], vec[j]);
    Quick_Sort(vec, start_index, j-1);
    Quick_Sort(vec, j+1, end_index);
}
void Max_Heapify(vector<int>& vec, int start_index, int end_index)
{
    int parent_index = start_index, child_index = start_index*2+1;
    while(child_index <= end_index)
    {
        if(child_index+1<=end_index && vec[child_index]<vec[child_index+1]) child_index++; // find the max child element
        if(vec[parent_index]<vec[child_index])
        {
            swap(vec[parent_index], vec[child_index]);
            parent_index = child_index;
            child_index = parent_index*2+1;
        }
        else    return; // since we go from bottom, there is no need to check the rest
    }
}
void Heap_Sort(vector<int>& vec)
{
    int length=vec.size();
    if(length==0)   return;
    // construct max_heap
    for(int i=length/2-1; i>=0; i--)    Max_Heapify(vec, i, length-1);

    for(int i=0; i<length-1; i++)
    {
        swap(vec[0], vec[length-1-i]);
        Max_Heapify(vec, 0, length-2-i);
    }
}
void Bucket_Sort(vector<int>& vec)
{
    int length=vec.size();
    if(length==0)   return;    
    int min_element = INT_MAX, max_element = INT_MIN; // find max/min element
    for(auto i:vec)
    {
        if(min_element>i)   min_element = i;
        if(max_element<i)   max_element = i;
    }
    vector<int> buckets(max_element-min_element+1, 0); // init buckets with 0
    for(auto i:vec)
        buckets[i-min_element]++;

    int i=0;
    for(int j=0; j<max_element-min_element+1; j++)
    {
        if(buckets[j]==0)   continue;
        for(int k=0; k<buckets[j]; k++)
        {
            vec[i++] = min_element+j;
        }
    }
}
void Shell_Sort(vector<int>& vec)
{
    int increment = 3;
    int length = vec.size();
    int step=length/increment+1; // you can choose increment=3 or anything else(<length)
    while(step>=1)
    {
        // this part is same with insertion sort
        for(int i=step; i<length; i++)
        {
            int key=vec[i];
            int j=i-step;
            while(j>=0 && key<vec[j])
            {
                vec[j+step]=vec[j];
                j-=step;
            }
            vec[j+step]=key;
        }
        step=step/increment;
    }
}
