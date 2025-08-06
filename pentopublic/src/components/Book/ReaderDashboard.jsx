import React, { useEffect, useState } from 'react';
import {
  Card, CardContent, CardFooter, CardTitle, CardDescription
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import { fetchBooksWithFiles, fetchTopBooks } from '@/services/bookService';
import Header from '@/layout/Header';
import Footer from '@/layout/Footer';
import { Badge } from '@/components/ui/badge';
import {
  CalendarDays, User, BookOpen, Heart, Eye, Play, Star
} from 'lucide-react';

const getDriveImageLink = (url) => {
  try {
    const match = url?.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (match?.[1]) {
      const id = encodeURIComponent(match[1]);
      return `https://drive.google.com/uc?export=view&id=${id}`;
    }
  } catch {}
  return '/fallback-image.png';
};

const ReaderDashboard = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [likedBooks, setLikedBooks] = useState(new Set());

  const loadBooks = async () => {
    try {
      const fetched = filter === 'top'
        ? await fetchTopBooks()
        : await fetchBooksWithFiles();

      let sorted = [...fetched];
      if (filter === 'recent') {
        sorted.sort((a, b) =>
          new Date(b.uploadDate || b.createdAt) -
          new Date(a.uploadDate || a.createdAt)
        );
      } else if (filter === 'free') {
        sorted = sorted.filter(b => b.isFree || b.price === 0);
      } else if (filter === 'audio') {
        sorted = sorted.filter(b => b.bookFiles?.[0]?.audioPath);
      }

      setBooks(sorted);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    setSearch('');
    loadBooks();
  }, [filter]);

  const toggleLike = (bookId) => {
    setLikedBooks(prev => {
      const next = new Set(prev);
      next.has(bookId) ? next.delete(bookId) : next.add(bookId);
      return next;
    });
  };

  const filteredBooks = books.filter(b =>
    b.title?.toLowerCase().includes(search.toLowerCase()) ||
    b.author?.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header search={search} setSearch={setSearch} setFilter={setFilter} />

      <main className="flex-grow px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6">
            All Books ({filteredBooks.length})
          </h2>

          {filteredBooks.length === 0 ? (
            <div className="flex flex-col items-center py-20 text-center">
              <BookOpen className="w-16 h-16 text-gray-400 mb-4"/>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No books found
              </h3>
              <p className="text-gray-500">Try adjusting search or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-center">
              {filteredBooks.map(book => {
                const file = book.bookFiles?.[0];
                const frontPage = file?.frontPageLink;
                const imageUrl = frontPage ? getDriveImageLink(frontPage) : '/fallback-image.png';
                const uploadDate = book.uploadDate
                  ? new Date(book.uploadDate).toLocaleDateString()
                  : 'Unknown';
                const id = book.bookId || book.id;
                const isLiked = likedBooks.has(id);
                const hasAudio = Boolean(file?.audioPath);
                const hasPdf = Boolean(file?.pdfPath);

                return (
                  <Card
                    key={id}
                    className="w-64 h-[540px] flex flex-col justify-between overflow-hidden shadow-lg bg-white group"
                  >
                    {/* Cover Image */}
                    <div className="aspect-[3/4] w-full bg-gray-100 overflow-hidden">
                      <img
                        src={imageUrl}
                        alt={book.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={e => (e.target.src = '/fallback-image.png')}
                      />
                    </div>

                    {/* Content */}
                    <CardContent className="flex flex-col flex-grow space-y-1 pt-4 px-4 pb-2">
                      <CardTitle className="text-sm font-semibold line-clamp-2">
                        {book.title}
                      </CardTitle>
                      <CardDescription className="text-xs line-clamp-2">
                        {book.description}
                      </CardDescription>

                      <div className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {book.author?.name || 'Unknown'}
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <CalendarDays className="w-3 h-3" />
                        {uploadDate}
                      </div>
                    </CardContent>

                    {/* Footer */}
                    <CardFooter className="flex justify-between px-4 pb-4 pt-0">
                      <Badge className="bg-emerald-500 text-white text-xs px-2 py-1 flex items-center gap-1">
                        <Star className="w-3 h-3" /> Published
                      </Badge>

                      <div className="flex items-center gap-2">
                        {/* PDF Viewer */}
                        {hasPdf && (
                          <Dialog>
                            <DialogTrigger asChild>
                              <button className="p-1 bg-white rounded-full shadow group-hover:bg-gray-100">
                                <Eye className="w-4 h-4 text-blue-600" />
                              </button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden p-4">
                              <div className="flex flex-col h-full space-y-4">
                                <div className="space-y-1">
                                  <h2 className="text-xl font-bold text-gray-800">{book.title}</h2>
                                  <p className="text-sm text-gray-600">{book.description}</p>
                                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                    <User className="w-4 h-4" />
                                    <span>{book.author?.name || 'Unknown'}</span>
                                  </div>
                                </div>
                                <div className="flex-grow overflow-auto rounded-md">
                                  <iframe
                                    src={file.pdfPath.replace('/view?usp=sharing','/preview')}
                                    width="100%"
                                    height="500"
                                    title="PDF Preview"
                                    className="rounded-md"
                                    allow="autoplay"
                                  ></iframe>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        )}

                        {/* Audio Player */}
                        {hasAudio && !hasPdf && (
                          <button
                            className="p-1 bg-white rounded-full shadow group-hover:bg-gray-100"
                            onClick={() => {
                              const a = new Audio(file.audioPath);
                              a.play();
                            }}
                          >
                            <Play className="w-4 h-4 text-purple-600" />
                          </button>
                        )}

                        {/* Like Button */}
                        <button
                          className={`p-1 bg-white rounded-full shadow group-hover:bg-gray-100 ${
                            isLiked ? 'bg-red-100' : ''
                          }`}
                          onClick={() => toggleLike(id)}
                        >
                          <Heart className={`w-4 h-4 text-red-500 ${isLiked ? 'fill-current' : ''}`} />
                        </button>
                      </div>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ReaderDashboard;
