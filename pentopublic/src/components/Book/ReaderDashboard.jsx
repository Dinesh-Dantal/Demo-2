import { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { fetchBooksWithFiles, fetchTopBooks } from "@/services/bookService";
import Header from '@/layout/Header';
import Footer from '@/layout/Footer';
import { Badge } from "@/components/ui/badge";
import { CalendarDays, User } from "lucide-react";

const getDriveImageLink = (url) => {
  try {
    const match = url?.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (match?.[1]) {
      const id = encodeURIComponent(match[1]);
      return `https://drive.google.com/uc?export=view&id=${id}`;
    }
  } catch {
    return "/fallback-image.png";
  }
};

const ReaderDashboard = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const loadBooks = async () => {
    try {
      let fetchedBooks = [];

      if (filter === "top") {
        fetchedBooks = await fetchTopBooks();
      } else {
        fetchedBooks = await fetchBooksWithFiles();
      }

      if (filter === "recent") {
        fetchedBooks = fetchedBooks.sort(
          (a, b) => new Date(b.uploadDate || b.createdAt) - new Date(a.uploadDate || a.createdAt)
        );
      } else if (filter === "free") {
        fetchedBooks = fetchedBooks.filter(book => book.isFree || book.price === 0);
      } else if (filter === "audio") {
        fetchedBooks = fetchedBooks.filter(book => book.bookFiles?.[0]?.audioPath);
      }

      setBooks(fetchedBooks);
    } catch (err) {
      console.error("Failed to load books", err);
    }
  };

  useEffect(() => {
    setSearch(""); // Reset search on filter change
    loadBooks();
  }, [filter]);

  const filteredBooks = books.filter(book =>
    book.title?.toLowerCase().includes(search.toLowerCase()) ||
    book.author?.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f8ff]">
      <Header search={search} setSearch={setSearch} setFilter={setFilter} />

      <main className="flex-grow p-6">
        <h2 className="text-2xl font-semibold mb-4">All Books ({filteredBooks.length})</h2>

        {filteredBooks.length === 0 ? (
          <p className="text-center text-gray-500">No books found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBooks.map(book => {
              const frontPage = book.bookFiles?.[0]?.frontPageLink;
              const imageUrl = frontPage ? getDriveImageLink(frontPage) : "/fallback-image.png";
              const uploadDate = book.uploadDate ? new Date(book.uploadDate).toLocaleDateString() : null;

              return (
                <Card key={book.bookId || book.id} className="rounded-xl shadow-sm border border-gray-200">
                  <CardContent className="p-4 flex flex-col h-full">
                    <div className="relative">
                      <img
                        src={imageUrl}
                        alt="Book cover"
                        className="w-full h-56 object-cover rounded-lg border"
                        onError={(e) => (e.target.src = "/fallback-image.png")}
                      />
                      <div className="absolute top-2 right-2 flex flex-wrap gap-1">
                        {book.isFree && <Badge className="bg-green-500">Free</Badge>}
                        {book.bookFiles?.[0]?.audioPath && <Badge className="bg-purple-400">Audio</Badge>}
                      </div>
                    </div>

                    <h2 className="text-lg font-bold mt-3 mb-1 truncate">{book.title}</h2>
                    <p className="text-muted-foreground text-sm mb-2 line-clamp-2">{book.description}</p>

                    <div className="flex items-center gap-1 text-sm text-gray-600 mt-auto">
                      <User className="w-4 h-4" />
                      <span>{book.author?.name || "Unknown"}</span>
                    </div>

                    <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                      <CalendarDays className="w-4 h-4" />
                      <span>{uploadDate}</span>
                    </div>

                    <div className="flex flex-wrap items-center justify-between mt-3">
                      <Badge className="bg-emerald-600 text-white">Published</Badge>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="link" className="text-blue-600 hover:underline p-0">Read More</Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                          <h2 className="text-2xl font-semibold mb-2">{book.title}</h2>
                          <p className="text-muted-foreground mb-2">by {book.author?.name}</p>
                          <p className="mb-4">{book.description}</p>

                          {book.bookFiles?.[0]?.pdfPath ? (
                            <>
                              <h3 className="text-lg font-medium mb-2">Read Book</h3>
                              <iframe
                                src={book.bookFiles[0].pdfPath.replace("/view?usp=sharing", "/preview")}
                                width="100%"
                                height="600"
                                allow="autoplay"
                                title="Book PDF"
                                className="rounded-xl border mb-6"
                              />
                            </>
                          ) : (
                            <p className="text-sm italic text-gray-500">No reading material available.</p>
                          )}

                          {book.bookFiles?.[0]?.audioPath && (
                            <>
                              <h3 className="text-lg font-medium mb-2">Listen to Audio</h3>
                              <audio controls className="w-full">
                                <source src={book.bookFiles[0].audioPath} type="audio/mpeg" />
                                Your browser does not support the audio element.
                              </audio>
                            </>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ReaderDashboard;
