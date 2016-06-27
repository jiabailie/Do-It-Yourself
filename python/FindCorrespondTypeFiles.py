# reference: http://pythoncentral.io/recursive-python-function-example-make-list-movies/
import os
 
def print_movie_files(movie_directory, movie_extensions=['avi', 'dat', 'mp4', 'mkv', 'vob']):
    ''' Print files in movie_directory with extensions in movie_extensions, recursively. '''
 
    # Get the absolute path of the movie_directory parameter
    movie_directory = os.path.abspath(movie_directory)
 
    # Get a list of files in movie_directory
    movie_directory_files = os.listdir(movie_directory)
 
    # Traverse through all files
    for filename in movie_directory_files:
        filepath = os.path.join(movie_directory, filename)
 
        # Check if it's a normal file or directory
        if os.path.isfile(filepath):
 
            # Check if the file has an extension of typical video files
            for movie_extension in movie_extensions:
                # Not a movie file, ignore
                if not filepath.endswith(movie_extension):
                    continue
 
                # We have got a video file! Increment the counter
                print_movie_files.counter += 1
 
                # Print it's name
                print('{0}'.format(filepath))
        elif os.path.isdir(filepath):
            # We got a directory, enter into it for further processing
            print_movie_files(filepath
