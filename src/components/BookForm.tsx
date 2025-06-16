import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { Card, CardContent, CardFooter, CardHeader } from './ui/card'
import type { BookFormValues } from '../types'

interface BookFormProps {
  onSubmit: (data: BookFormValues) => void
  initialValues?: BookFormValues | null
}

const BookForm: React.FC<BookFormProps> = ({ onSubmit, initialValues }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookFormValues>({
    defaultValues: {
      _id: '',
      title: '',
      author: '',
      description: '',
      genre: [],
      publishedYear: new Date(),
    },
    mode: 'onSubmit',
  })

  useEffect(() => {
    if (initialValues) {
      reset(initialValues)
    }
  }, [initialValues, reset])

  const handleFormSubmit = (data: BookFormValues & { genre: string | string[] }) => {
  const genreArray =
    typeof data.genre === 'string'
      ? data.genre.split(',').map((g) => g.trim())
      : data.genre

  onSubmit({
    ...data,
    genre: genreArray,
    _id: initialValues?._id || data._id,
  })

  reset()
}



  return (
    <div className="flex items-center justify-center">
      <Card className="mb-10 w-full max-w-3xl">
        <CardHeader>
        
        </CardHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <CardContent className="space-y-4">

            {/* Title */}
            <Controller
              name="title"
              control={control}
              rules={{ required: 'Title is required' }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Book title"
                  className={errors.title ? 'border-red-500' : ''}
                />
              )}
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}

            {/* Author */}
            <Controller
              name="author"
              control={control}
              rules={{ required: 'Author is required' }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Author"
                  className={errors.author ? 'border-red-500' : ''}
                />
              )}
            />
            {errors.author && <p className="text-red-500 text-sm">{errors.author.message}</p>}

            {/* Description */}
            <Controller
              name="description"
              control={control}
              rules={{ required: 'Description is required' }}
              render={({ field }) => (
                <Textarea
                  {...field}
                  placeholder="Book description"
                  className={errors.description ? 'border-red-500' : ''}
                />
              )}
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}

            {/* Genre (comma-separated) */}
            <Controller
              name="genre"
              control={control}
              rules={{ required: 'Genre is required' }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Genres (comma-separated)"
                  className={errors.genre ? 'border-red-500' : ''}
                />
              )}
            />
            {errors.genre && <p className="text-red-500 text-sm">{errors.genre.message}</p>}

            {/* Published Year */}
        <Controller
            name="publishedYear"
            control={control}
            rules={{ required: 'Published year is required' }}
            render={({ field }) => (
            <Input
            {...field}
            type="date"
            className={errors.publishedYear ? 'border-red-500' : ''}
            value={
                field.value instanceof Date
                ? field.value.toISOString().split('T')[0] // format to YYYY-MM-DD
                : field.value
            }
            onChange={(e) => field.onChange(new Date(e.target.value))}
            />
            )}
        />

            {errors.publishedYear && <p className="text-red-500 text-sm">{errors.publishedYear.message}</p>}

          </CardContent>

          <CardFooter>
            <Button
              type="submit"
             className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-xl shadow-md transition"
>
  {initialValues ? '✏️ Update Book' : '🎈 Drop a Book'}

            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default BookForm